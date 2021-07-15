import React from 'react';

// import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// // This 'Search' test was failing when put in .test.js but passes here, but 
// - the App does not render with this test Headers...Thus commented outerHeight.
// describe('Search', () => {
//   test('calls the onChange callback handler', async () => {
//     const onChange = jest.fn();
 
//     render(
//       <Search value="" onChange={onChange}>
//         Search:
//       </Search>
//     );
 
//     await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
 
//     expect(onChange).toHaveBeenCalledTimes(10);
//   });
// });


function getUser() {
  return Promise.resolve({ id: '1', name: 'Robin' });
}
 
function TestComponent() {
  const [search, setSearch] = React.useState('');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
 
    loadUser();
  }, []);
 
  function handleChange(event) {
    setSearch(event.target.value);
  }
 
  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}
      
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
 
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
}
 
function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}


 
export default TestComponent;