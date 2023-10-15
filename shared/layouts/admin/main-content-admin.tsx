import React from 'react'

interface Props {
    children: React.ReactNode;
  }

function MainContentAdmin({children}: Props) {
    return <div className='h-full'>{children}</div>;

}

export default MainContentAdmin