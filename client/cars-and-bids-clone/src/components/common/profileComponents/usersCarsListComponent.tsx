import React from 'react'

type Props = {
    checked: boolean,
    carImage: string,
    carTitle: string,
    addDate: Date,
    expireDate: Date,
    highestBid: Number,
    update: unknown,
    delete: unknown
}

const usersCarsListComponent: React.FC<Props> = ({checked, carImage, carTitle, addDate, expireDate, highestBid, update, delete}) => {
  return (
    <div className='flex flex-row'>usersCarsListComponent</div>
  )
}

export default usersCarsListComponent