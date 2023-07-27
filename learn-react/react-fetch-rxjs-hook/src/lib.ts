import { useState, useEffect } from 'react';
import { Observable } from 'rxjs'

type User = {
  id: number
  name: string
}

type FetchMock = (url: string, { signal}: {signal: AbortSignal}) => Promise<{json: () => Promise<User[]>}>

// mock fetch API because we don't have a server
const fetch: FetchMock = (url, { signal }) => {
  return new Promise((resolve) => {
    const delay = setTimeout(() => {
      resolve({
        json: () => new Promise(resolve => {
          console.log('resolve')
          resolve([{id: 1, name: 'John Doe'}, {id:2, name: 'Jane Doe'}])
        })
      })
    }, 1500)
    signal.onabort = () => clearTimeout(delay)
  })
}

export const getUsers = () => {
  return new Observable((subscriber) => {
    const controller = new AbortController()
    const { signal } = controller
    fetch('/api/users', { signal })
      .then((response) => response.json())
      .then((usersFromApi) => {
        subscriber.next(usersFromApi)
        subscriber.complete()
      })
      .catch((apiError) => subscriber.error(apiError))
    return () => controller.abort()
  })
}

export const useObservable = <T, >(source: Observable<T>): [any, T | undefined] => {
  const [value, setValue] = useState<T | undefined>()
  const [error, setError] = useState()

  useEffect(() => {
    const subscription = source.subscribe(setValue, setError)
    return () => subscription.unsubscribe()
  }, [source])

  return [error, value]
}