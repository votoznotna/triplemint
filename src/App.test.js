import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders bedrooms selector', () => {
  const { getByText } = render(<App />);
  const selectorElement = getByText(/bedrooms/i);
  expect(selectorElement).toBeInTheDocument();
});

test('expect to select Bedrooms option successfully', async () => {

  const {getByText, queryByText, queryAllByRole} = render(<App />)

  let clearButton = queryByText(/Clear/);
  expect(clearButton).not.toBeInTheDocument();

  let tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(0);

  const bedroomsSelector = queryByText(/bedrooms/i)
  expect(bedroomsSelector).toBeInTheDocument();

  fireEvent.change(bedroomsSelector)
  fireEvent.click(getByText(/Studio/))

  clearButton = queryByText(/Clear/);
  expect(clearButton).toBeInTheDocument();

  tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(1);

})

test('expect two tags upon clicking Clear button', async () => {

  const {queryByText, queryAllByRole} = render(<App />)

  let clearButton = queryByText(/Clear/);
  expect(clearButton).toBeInTheDocument();

  let tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(1);

  fireEvent.click(clearButton)

  tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(0);

})

test('expect three tags upon selection Bedrooms > 1 Bed & 2 Beds and Property Type > Single Family', async () => {

  const {queryByText, queryAllByRole} = render(<App />)

  let tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(0);

  const bedroomsSelector = queryByText(/bedrooms/i)
  expect(bedroomsSelector).toBeInTheDocument();

  fireEvent.change(bedroomsSelector)
  fireEvent.click(queryByText(/1 Bed/))

  fireEvent.change(bedroomsSelector)
  fireEvent.click(queryByText(/2 Beds/))

  const propertyTypeSelector = queryByText(/property type/i)
  expect(propertyTypeSelector).toBeInTheDocument();

  fireEvent.change(propertyTypeSelector)
  fireEvent.click(queryByText(/Single Family/i))

  tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(3);

  let clearButton = queryByText(/Clear/);
  expect(clearButton).toBeInTheDocument();

  fireEvent.click(clearButton)

  tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(0);

})

test('expect just one tag upon multiple Bathrooms selections', async () => {

  const {queryByText, queryAllByRole} = render(<App />)

  let tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(0);

  const bathroomsSelector = queryByText(/Bathrooms/)
  expect(bathroomsSelector).toBeInTheDocument();

  fireEvent.change(bathroomsSelector)
  fireEvent.click(queryByText(/1\+ Bath/))

  tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(1);

  fireEvent.change(bathroomsSelector)
  fireEvent.click(queryByText(/2\+ Baths/))

  expect(tagList.length).toEqual(1);

  fireEvent.change(bathroomsSelector)
  fireEvent.click(queryByText(/3\+ Bath/))

  fireEvent.change(bathroomsSelector)
  fireEvent.click(queryByText(/3.5\+ Bath/))

  expect(tagList.length).toEqual(1);

  let clearButton = queryByText(/Clear/);
  expect(clearButton).toBeInTheDocument();

  fireEvent.click(clearButton)

  tagList = queryAllByRole(/tag/);
  expect(tagList.length).toEqual(0);

})