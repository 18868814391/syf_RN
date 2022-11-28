import {useState, useRef, useEffect} from 'react';

export default initState => {
  const stateRef = useRef(null);
  const [state, setState] = useState(initState);
  useEffect(() => {
    stateRef.current && stateRef.current(state);
  }, [state]);

  return [
    state,
    newState: () =>{
      return new Promise(rel => {
        stateRef.current = rel;
        setState(newState);
      }),
    }
  ];
};
