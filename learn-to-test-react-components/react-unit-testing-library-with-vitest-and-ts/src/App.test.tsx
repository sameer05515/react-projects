import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, it } from "vitest";

it("should have hello ajay", ()=>{
    render(<App/>);
    const message= screen.queryByText(/Hello Prem/i);
    // console.log('message: '+message)
    expect(message).toBeVisible();

    const linkElement = screen.getByTestId("app_div");
    // console.log('linkElement: '+linkElement)
	expect(linkElement).toHaveTextContent("Hello Prem");
	
})