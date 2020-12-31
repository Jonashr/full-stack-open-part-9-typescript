import React from 'react'

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return (
    <div>
      { courseName }
    </div>
  )
}

export default Header
