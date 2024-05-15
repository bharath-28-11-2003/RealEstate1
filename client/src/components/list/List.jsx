import React from 'react'
import './list.scss';
import Card from '../card/Card';
import { listData } from '../../lib/dummydata';

const List = ({posts}) => {
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List