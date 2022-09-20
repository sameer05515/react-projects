import Card from "../UI/Card";

const LoginElement = (props) => {

    const loginEventHandler = event => {
        event.preventDefault();

    };

    return (
        <Card>
            <form onSubmit={loginEventHandler}>
                <label htmlFor="userName">User Name: </label>
                <input id="userName" type="text" />
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" />
                <button type="submit">Login</button>
            </form>
        </Card>
    );
}

export default LoginElement;