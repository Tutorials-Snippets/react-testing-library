//Tests written by Ashique March 2021
import {multiply, TenPercent }from './math.js';

import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import TestComponent from './testComponent';
// import Search from './testComponent';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import DataFetch from './DataFetch';
import App from './App';

// My first test - Not from any tutorial but written by me on my own!

describe('Inside Form', () => {
  test('renders input field', () => {
    render(<input />);

    screen.debug();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  })
})

jest.mock('axios');
 
describe('DataFetch', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];
 
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );
 
    render(<DataFetch />);
 
    await userEvent.click(screen.getByRole('button'));
 
    const items = await screen.findAllByRole('listitem');
 
    expect(items).toHaveLength(2);
  });

  test('fetches stories from an API and fails', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error())
      );
    
      render(<DataFetch />);
  
      await userEvent.click(screen.getByRole('button'));
  
      const message = await screen.findByText(/Something went wrong/);
  
      expect(message).toBeInTheDocument();
  });
});


// This test does the same as the test above: 'fetches stories from an API and displays them'
// but it shows how to await a promise in a nmore explicit way,
// this works if you don't want to wait for the HTML to show up.

jest.mock('axios');
 
describe('DataFetch', () => {
  test('fetches stories from an API and displays them - Explicit method of awaiting', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];
 
    const promise = Promise.resolve({ data: { hits: stories } });
 
    axios.get.mockImplementationOnce(() => promise);
 
    render(<DataFetch />);
 
    await userEvent.click(screen.getByRole('button'));
 
    await act(() => promise);
 
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});







describe('TestComponent', () => {
    test('renders TestComponent component', async () => {
      render(<TestComponent />);

     await screen.findByText(/Signed in as/);

     expect(screen.queryByText(/Search for JavaScript/)).toBeNull();
     

     await userEvent.type(screen.getByRole('textbox'), 'JavaScript')

     expect(
       screen.getByText(/Searches for JavaScript/)
       ).toBeInTheDocument();
   
    });
});


describe('Calculate percentage', () => {
    test('10 percent of this number', () => {
        expect(TenPercent(1000)).toBe(100);
    })
})

describe('multiply', () => {
    test('multiply two numbers', () => {
        expect(multiply(3, 5)).toBe(15);
    });
});

describe('true is truthy and false is falsy', () => {
    test('true is truthy', () => {
      expect(true).toBe(true);
    });
   
    test('false is falsy', () => {
      expect(false).toBe(false);
    });
});