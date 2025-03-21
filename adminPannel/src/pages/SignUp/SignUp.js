import React from 'react';
import { InfoSection } from '../../components';
import { homeObjOne } from './data';
function SignUp() {
  return (
    <>
      <InfoSection {...homeObjOne} />
    </>
  );
}

export default SignUp;