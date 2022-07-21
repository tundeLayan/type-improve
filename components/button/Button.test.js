import "@testing-library/jest-dom";
import { fireEvent,  render, screen } from "@testing-library/react";

import Button from './button';

describe("<Button />", () => {

  it('renders button', () => {
    render(<Button />);

    const buttonEl = screen.getByTestId("button");
    expect(buttonEl).toBeInTheDocument();
  });

});