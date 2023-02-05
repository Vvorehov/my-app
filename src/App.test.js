import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';

const countryJson = {
  "countries": [
      { "name": "USA", "code": "USA" },
      { "name": "Canada", "code": "CAN" },
      { "name": "Mexico", "code": "MEX" },
      { "name": "Australia", "code": "AUS" },
      { "name": "Brazil", "code": "BRA" },
      { "name": "France", "code": "FRA" },
      { "name": "Germany", "code": "GER" },
      { "name": "Spain", "code": "ESP" },
      { "name": "Italy", "code": "ITA" },
      { "name": "UK", "code": "UK" }
  ]
};


// describe("Fetch", () => {
//   test('handles server error', async () => {
//     render(<App />)
//     const res = await fetch("./data/countries.json")
//       .then(res => res.json())
//     expect(res.status).toBe(200)
//   })
// })

describe("User name input", () => {
  test("should show error message when value is empty", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Please enter user name");
    await userEvent.type(input, 'abcd');
    await userEvent.clear(input);
    expect(screen.getByText("Not empty, min 3 chars")).toBeTruthy();
  });

  test("should show error message when value length is less than 3", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Please enter user name");
    await userEvent.type(input, 'ab');
    expect(screen.getByText("Not empty, min 3 chars")).toBeTruthy();
  });

  test("should not show error message when value length is greater or equal to 3", async () => {
    render(<App />)
    const input = screen.getByPlaceholderText("Please enter user name");
    await userEvent.type(input, 'abc');
    expect(screen.queryByText("Not empty, min 3 chars")).toBeNull();
  });
})

describe("Tax identifier input", () => {

  test("should show error message if no country choosen", async () => {
    render(<App />)
    const inputTaxId = screen.getByPlaceholderText("Please enter correct tax identifier");
    await userEvent.type(inputTaxId, 'abcd-1234');
    expect(screen.getByText("Please choose country first")).toBeTruthy();
  });

  // ToDo need to handle autocomplete MUI emulation
  // test("should show error message when value is empty", async () => {
  //   render(<App />)
  //   const inputTaxId = screen.getByPlaceholderText("Please enter correct tax identifier");
  //   await userEvent.type(inputTaxId, 'abcd');
  //   await userEvent.clear(inputTaxId);
  //   expect(screen.getByText("Please provide correct tax identifier")).toBeTruthy();
  // });

  // test("should show error message if USA was choosen and tax id incorrect", async () => {
  //   render(<App />)
  //   const inputTaxId = screen.getByPlaceholderText("Please enter user name");
  //   const inputCity = screen.getByTestId("ArrowDropDownIcon");
  //   await userEvent.click(inputCity);
  //   //await waitFor(() => screen.findByText('USA'))
  //   await waitFor(() => {
  //     expect(screen.getByText('USA')).toBeInTheDocument()
  //   })
  //   await userEvent.click(screen.getByRole("option").toHaveTextContent('USA'));
  //   await userEvent.type(inputTaxId, 'abc');
  //   //expect(screen.getByText("Please choose country first")).toBeTruthy();
  //   expect(screen.getByText("Please provide correct tax identifier")).toBeTruthy();
  // });
})