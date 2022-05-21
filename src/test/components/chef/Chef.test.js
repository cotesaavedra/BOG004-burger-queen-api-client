import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChefScreen } from "../../../components/chef/ChefScreen.js";


test('chef', () => {
    render(<ChefScreen/>);
    const title = screen.getByText('ChefScreen');
    expect(title).toBeInTheDocument();

})