import React from 'react'
import './Rank.css'
export default function Rank({name, rank}) {
    return (
      <div>
        <p>{name}, Your current entries is</p>
        <p>#{rank}</p>
      </div>
    )
}
