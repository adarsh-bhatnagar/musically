import React from 'react'
import { Icon } from '@iconify/react';

const IconText = ({iconName, displayText, active}) => {
  return (
    <div className='w-full flex items-center justify-start p-2 cursor-pointer'>
        <div>
            <Icon icon={iconName} color={`${active ? 'white' : 'gray'}`} fontSize={27} />
        </div>
        <div className="text-gray-300 ml-4 font-ubuntu text-lg hover:text-white">
            {displayText}
        </div>
    </div>
  )
}

export default IconText
