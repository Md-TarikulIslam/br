import React, { useState } from 'react'
import nav from '../../../images/nav.png'
import foo from '../../../images/foo.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const countries = ['England', 'Denmark', 'Spain', 'Italy', 'France', 'Germany', 'Netherlands', 'Portugal', 'USA', 'Belgium', 'Sweden', 'World'];

const leagues = ['UEFA Super Cup', 'Superliga', 'Premier League', 'Leagues Cup', 'FA Cup', 'Primera Division', 'UEFA Europa Conference League', 'Serie A', 'League One', 'La Liga', 'Ligue 1', 'Bundesliga', 'Eredivisie', 'Primeira Liga', 'Major League Soccer', 'Jupiler Pro League', 'Allsvenskan', 'UEFA Champions League', 'UEFA Europa League']

const Homepage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchStatsByDate = async () => {

    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { date: selectedDate },
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
  };


  const filteredData = stats.filter(stat => countries.includes(stat.league.country) && leagues.includes(stat.league.name));



  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
   
  };
  console.log(selectedDate)


  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStatsByDate();
  };

  const handleClick = (id) => {
    const demo = stats.find(stat=>stat.fixture.id===id)
    localStorage.setItem('data', JSON.stringify(demo))
    navigate(`/${id}`)
  }

  console.log(stats);

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

                {filteredData.map((stat) => (

                  <div key={stat.fixture.id}>

                    <div className='card card-body bg-base-100 shadow hover:bg-blue-50 hover:cursor-pointer' onClick={() => handleClick(stat.fixture.id)}>
                      <div className='flex justify-between'>
                        <div className='flex items-center gap-5'>
                          <p className='font-bold text-xl  '>{stat.teams.home.name}</p>
                          <img className='w-10 h-10' src={stat.teams.home.logo} alt="" />
                        </div>
                        <div className='flex items-center gap-5'>
                          <img className='w-10 h-10' src={stat.teams.away.logo} alt="" />
                          <p className='font-bold text-xl '>{stat.teams.away.name}</p>

                        </div>
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


        <img className='w-full grayscale' src={foo} alt="" />
      </div>
    </div>
  )
}

export default Homepage
