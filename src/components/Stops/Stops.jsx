import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';


const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const Paragraph = styled('p')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  margin: 10px 0;
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

const Pre = styled('pre')(
  ({ theme }) => `
  font-family: monospace;
  font-size: 0.875rem;
  margin: 0px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(0, 30, 60, 0.5)' : grey[50]
  };
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};



function Stops({ routeParam, directionObj, setSelectedStop }) {
  const dispatch = useDispatch();
  const stops = useSelector((store) => store.stopReducer);
  const history = useHistory();
  const [stop, setStop] = useState("");
  const [stopObj, setStopObj] = useState("");

  const userPref = useSelector((store) => store.userPrefReducer);
  // const { routeParam, directionParam } = useParams();

  // const setSelectedStop = (selectedStop) => {
  //   console.log("stop is", selectedStop);
  //   dispatch({ type: "SET_STOP_PREF", payload: selectedStop });
  // };
  useEffect(() => {
    // console.log("in direction useEffect", directionParam);
    // if (directionParam === 1 || directionParam === 0) {
    dispatch({
      type: "GET_STOPS",
      payload: { direction: directionObj.direction_id, route: routeParam },
    });
    // setStopLabel(stops[0].description);
    // }
    console.log('stops are', stops);
  }, []);

  // const backButton = () => {
  //   // history.push(`/info/directions/${routeParam}/${directionParam}`);
  // };

  // const nextButton = () => {
  //   // setSelectedStop(stops[stop]);
  //   history.push(
  //     // `/info/directions/stops/summary/${routeParam}/${directionParam}/${stopObj}`
  //   );
  // };
  

  // place_code

  return (
    <>
      <h1>Select Stop</h1>

      {stops.length > 0 ? (
        <CustomSelect
          value={stop}
          onChange={(event) => {

            setSelectedStop
            console.log(stop);
          }}
        >
          {stops.map((stop, i) => (
            <StyledOption key={i} value={stop} >
              {stop.description}
            </StyledOption>
          ))}
        </CustomSelect>
      ) : (
        <span></span>
      )}
      <div>
      <Paragraph>Selected character:</Paragraph>
      <Pre>{JSON.stringify(stop, null, 2)}</Pre>
        {/* <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button> */}
      </div>
    </>
  );
}

export default Stops;
