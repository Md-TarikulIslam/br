import React, { useState } from 'react'
import nav from '../../../images/nav.png'
import foo from '../../../images/foo.png'
import axios from "axios";

const Homepage = () => {
  const [stats, setStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const fetchStatsByDate = async () => {
    try {
      const response = await axios.get(`https://save-football-api.vercel.app/api/fixtures/${selectedDate}`);

      setStats(response.data);
      console.log(response.data)

      console.log(response.data[0].response[0].fixture.id)
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStatsByDate();
  };


  return (
    <div>
      <div>
        <img className='w-full' src={nav} alt="" />

        <form onSubmit={handleSubmit} className='text-center mx-auto max-w-4xl'>
          <h1 className='font-bold text-4xl text-center my-5 text-blue-600'>Stats</h1>
          <div className='flex items-center  justify-between mx-auto'>
            <p>Select date</p>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className='input input-bordered  w-full max-w-lg'
            />
            <button type="submit" className='btn btn-neutral'>Fetch Stats</button>
          </div>
        </form>
        {
          stats && <div className='max-w-4xl mx-auto my-5'>
            {stats.length > 0 ? (
              <div className='card card-body mb-10 bg-base-100 shadow-2xl'>
                {stats.map((stat) => (
                  <div key={stat.response[0].fixture.id}>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-5'>
                        <p className='font-bold text-xl  '>{stat.response[0].teams.home.name}</p>
                        <img className='w-10' src={stat.response[0].teams.home.logo} alt="" />
                      </div>
                      <div className='flex items-center gap-5'>
                        <img className='w-10' src={stat.response[0].teams.away.logo} alt="" />
                        <p className='font-bold text-xl '>{stat.response[0].teams.away.name}</p>

                      </div>
                    </div>
                    <p className='text-center mt-5'>Half Time Goal</p>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-2'>
                        <p>{stat.response[0].score.halftime.home}</p><progress className="progress w-96" value={stat.response[0].score.halftime.home} max="7"></progress>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p>{stat.response[0].score.halftime.away}</p><progress className="progress w-96" value={stat.response[0].score.halftime.away} max="7"></progress>
                      </div>
                    </div>
                    <p className='text-center mt-5'>Total Goals</p>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-2'>
                        <p>{stat.response[0].goals.home}</p><progress className="progress w-96" value={stat.response[0].goals.home} max="7"></progress>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p>{stat.response[0].goals.away}</p><progress className="progress w-96" value={stat.response[0].goals.away} max="7"></progress>
                      </div>
                    </div>


                  </div>
                )
                )
                }
              </div>

            ) : (
              <p>No stats to display.</p>
            )}

          </div>
        }


        <img className='w-full' src={foo} alt="" />
      </div>
    </div>
  )
}

export default Homepage
