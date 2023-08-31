import React, { useEffect, useState } from 'react'
import nav from '../../../images/nav.png'
import foo from '../../../images/foo.png'
import axios from "axios";
import { useParams } from 'react-router-dom';



const Details = () => {
  const { id } = useParams();
  console.log(id);
  const [stats, setStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const getDate = localStorage.getItem('date')

  console.log(getDate)



  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { date: getDate },
      headers: {
        'X-RapidAPI-Key': 'b6e89817d6msh36107de73277139p116779jsne307fb015e33',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setStats(response.data.response)
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    fetchData()
  }, []);
  console.log(stats)
  const abc = stats.find(({ id }) => id === id)
  console.log(abc)

  return (
    <div>
      <div>
        <img className='w-full' src={nav} alt="" />
        <div className='card card-body mb-10 bg-base-100 shadow-2xl max-w-4xl mx-auto my-5'>
          <div>
            <p className='text-center mt-5'>Shots on target</p>
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
          </div>
        </div>




        <img className='w-full grayscale' src={foo} alt="" />
      </div>
    </div>
  )
}

export default Details
