import React, { useEffect, useState } from 'react'
import nav from '../../../images/nav.png'
import foo from '../../../images/foo.png'
import axios from "axios";
import { useParams } from 'react-router-dom';



const Details = () => {


  const abc = localStorage.getItem('data')
  const data = JSON.parse(abc);
  console.log(data.fixture.id)
  const defaultProgressValue = 0;

  return (
    <div>
      <div>
        <img className='w-full' src={nav} alt="" />
        <div className='card card-body mb-10 bg-base-100 shadow-2xl max-w-4xl mx-auto my-5'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-5'>
              <p className='font-bold text-xl  '>{data.teams.home.name}</p>
              <img className='w-10 h-10' src={data.teams.home.logo} alt="" />
            </div>
            <div className='flex items-center gap-5'>
              <img className='w-10 h-10' src={data.teams.away.logo} alt="" />
              <p className='font-bold text-xl '>{data.teams.away.name}</p>

            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Half Time</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{data ? data.score.halftime.home : defaultProgressValue}</p>
                <progress className="progress w-96" value={data ? data.score.halftime.home : defaultProgressValue} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{data ? data.score.halftime.away : defaultProgressValue}</p>
                <progress className="progress w-96" value={data ? data.score.halftime.away : defaultProgressValue} max="7"></progress>
              </div>
            </div>
          </div>
          {/* <div>
            <p className='text-center mt-5'>Shots off target</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>blocked Shots</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Possession (%)</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Corner Kicks</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Offsidest</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Fouls</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Yellow cards</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Red cards</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Goalkeeper saves</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div>
          <div>
            <p className='text-center mt-5'>Goal kicks</p>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.home}</p><progress className="progress w-96" value={abc.score.halftime.home} max="7"></progress>
              </div>
              <div className='flex flex-col gap-2'>
                <p>{abc.score.halftime.away}</p><progress className="progress w-96" value={abc.score.halftime.away} max="7"></progress>
              </div>
            </div>
          </div> */}
        </div>




        <img className='w-full grayscale' src={foo} alt="" />
      </div>
    </div>
  )
}

export default Details
