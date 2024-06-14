import { useState, useCallback, useEffect, useRef } from 'react';

const App = () => {
  // State variables to manage password length, inclusion of numbers, inclusion of special characters, and the generated password
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // Ref to access the password input element
  const passwordRef = useRef(null);

  // Function to generate a password based on the selected options
  const generatePassword = useCallback(() => {
    let password = '';

    // Base character set
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let number = '1234567890';
    let char = '!@#$%^&*()_+';

    // Include numbers if allowed
    if (numberAllowed) {
      str += number;
    }

    // Include special characters if allowed
    if (CharacterAllowed) {
      str += char;
    }

    // Generate a random password of the specified length
    for (let i = 0; i < length; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length));
    }

    // Set the generated password
    setPassword(password);

  }, [length, numberAllowed, CharacterAllowed]);

  // Effect to generate a new password whenever the dependencies change
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, CharacterAllowed, generatePassword]);

  // Function to copy the password to the clipboard
  const copyPassWordToClipboard = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  return (
    <div className='bg-slate-300 flex items-center justify-center min-h-screen p-5'>
      <div className='md:max-w-lg lg:max-w-xl bg-slate-700 rounded-xl w-full max-w-md p-6 shadow-xl'>
        <h1 className='mb-6 text-3xl font-bold text-center text-white'>Password Generator</h1>
        <div className='mb-4'>
          <input
            type="text"
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
            className='text-slate-700 w-full p-3 mb-2 bg-white rounded'
          />
          <button onClick={copyPassWordToClipboard} className='hover:bg-blue-600 w-full p-2 text-white transition bg-blue-500 rounded'>
            Copy
          </button>
        </div>
        <div className='mb-4'>
          <label htmlFor="length" className='block mb-2 text-white'>
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={40}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='w-full'
          />
        </div>
        <div className='flex items-center mb-4'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
            className='mr-2'
          />
          <label htmlFor="numbers" className='text-white'>
            Numbers
          </label>
        </div>
        <div className='flex items-center mb-4'>
          <input
            type="checkbox"
            defaultChecked={CharacterAllowed}
            onChange={() => setCharacterAllowed(prev => !prev)}
            className='mr-2'
          />
          <label htmlFor="charInput" className='text-white'>
            Character
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
