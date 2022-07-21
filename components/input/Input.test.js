import "@testing-library/jest-dom";
import {  render, screen } from "@testing-library/react";

import Input from './input';

describe("<Input />", () => {

  it('renders text input', () => {
    render(<Input />);

    const inputEl = screen.getByTestId("text-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

});