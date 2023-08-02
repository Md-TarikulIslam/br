import React from 'react'
import nav from '../../../images/nav.png'
import foo from '../../../images/foo.png'

const Homepage = () => {
  const fakeFootballData = [
    {
      id: 1,
      team1: 'Barcelona',
      goals: 50,
      shots: 180,
      possession: 65,
    },
    {
      id: 2,
      team2: 'Real Madrid',
      goals: 95,
      shots: 150,
      possession: 55,
    },

  ];
  return (
    <div>
      <div>
        <img className='w-full' src={nav} alt="" />
        <h1 className='card-title text-4xl max-w-7xl mx-auto my-5 text-blue-600'>Stats</h1>

        <div className='card card-body mb-10 bg-base-100 max-w-4xl mx-auto shadow-xl'>
          <div className='flex   flex-col lg:flex-row justify-between max-w-3xl mx-auto gap-5'>
            {fakeFootballData.map((teamStats, index) => (
              <div key={index} className=''>
                <p className='font-bold text-xl  text-left'>{teamStats.team1}</p>
                <p className='font-bold text-xl  text-right'>{teamStats.team2}</p>
                <p className='text-center mt-5'>Shots on target</p>
                <p>{teamStats.goals}<progress className="progress w-96" id={teamStats.id} value={teamStats.goals} max="100"></progress></p>

                <p className='text-center mt-5'>Shot off target</p>
                <p>{teamStats.shots}<progress className="progress w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Blocked Shots</p>
                <p>{teamStats.shots}<progress className="progress w-96" id={teamStats.id} value={teamStats.shots} max="300"></progress></p>
                <p className='text-center mt-5'>Possession (%)</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Corner Kicks</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Offsides</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Fouls</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Throw ins</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Yellow Cards</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Red cards</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Goalkeeper saves</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>
                <p className='text-center mt-5'>Goal kicks</p>
                <p>{teamStats.shots}<progress className="progress  w-96" id={teamStats.id} value={teamStats.shots} max="200"></progress></p>


              </div>
            ))}
          </div>
        </div>
        <img className='w-full' src={foo} alt="" />
      </div>
    </div>
  )
}

export default Homepage
