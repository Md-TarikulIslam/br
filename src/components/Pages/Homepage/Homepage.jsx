import React, { useState } from "react";
import nav from "../../../images/nav.png";
import foo from "../../../images/foo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../assests/loading.svg";

const countries = [
    "England",
    "Denmark",
    "Spain",
    "Italy",
    "France",
    "Germany",
    "Netherlands",
    "Portugal",
    "USA",
    "Belgium",
    "Sweden",
    "World",
];

const leagues = [
    "UEFA Super Cup",
    "Superliga",
    "Premier League",
    "Leagues Cup",
    "FA Cup",
    "Primera Division",
    "UEFA Europa Conference League",
    "Serie A",
    "League One",
    "La Liga",
    "Ligue 1",
    "Bundesliga",
    "Eredivisie",
    "Primeira Liga",
    "Major League Soccer",
    "Jupiler Pro League",
    "Allsvenskan",
    "UEFA Champions League",
    "UEFA Europa League",
];

const Homepage = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStatsByDate = async (date) => {
        setLoading(true);
        const options = {
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
            params: { date: date },
            headers: {
                "X-RapidAPI-Key": "b6e89817d6msh36107de73277139p116779jsne307fb015e33",
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setStats(response.data.response);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const filteredData = stats.filter(
        (stat) => countries.includes(stat.league.country) && leagues.includes(stat.league.name)
    );

    const handleDateChange = (event) => {
        const date = event.target.value;
        fetchStatsByDate(date);
    };

    const handleClick = (id) => {
        const fixture = stats.find((stat) => stat.fixture.id === id);
        localStorage.setItem("fixture", JSON.stringify(fixture));
        localStorage.setItem("fixtureId", JSON.stringify(id));
        navigate(`/${id}`);
    };

    return (
        <div>
            {/* navbar */}
            <nav>
                <img className="w-full" src={nav} alt="" />
            </nav>

            {/* main body */}
            <main className="mx-auto max-w-screen-xl">
                <h1 className="font-bold text-2xl lg:text-4xl text-center my-5 text-blue-600">Stats</h1>

                {/* search field */}
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center gap-3 justify-between flex-row-reverse">
                        <label htmlFor="date" className="btn btn-neutral">
                            Select Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            onChange={handleDateChange}
                            className="input input-bordered w-[calc(100%-110px)]"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="w-full min-h-[calc(100vh-300px)] flex justify-center items-center">
                        <img className="w-10 h-10" src={Loading} alt="loading" />
                    </div>
                ) : (
                    <div className="my-8 min-h-[calc(100vh-300px)]">
                        {filteredData.length > 0 ? (
                            <div className="card p-4 bg-base-100 shadow-2xl space-y-4">
                                {filteredData.map((stat) => (
                                    <div
                                        key={stat.fixture.id}
                                        className="card px-8 py-6 bg-base-100 shadow hover:bg-blue-50 hover:cursor-pointer"
                                        onClick={() => handleClick(stat.fixture.id)}
                                    >
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center gap-5 justify-start">
                                                <p className="font-bold text-xl">{stat.teams.home.name}</p>
                                                <img
                                                    className="w-10 h-10"
                                                    src={stat.teams.home.logo}
                                                    alt={`${stat.teams.home.name} logo`}
                                                />
                                            </div>
                                            <div className="flex-1 text-center vs text-xl text-red-500">v/s</div>
                                            <div className="flex-1 flex items-center gap-5 justify-end">
                                                <img
                                                    className="w-10 h-10"
                                                    src={stat.teams.away.logo}
                                                    alt={`${stat.teams.away.name} logo`}
                                                />
                                                <p className="font-bold text-xl ">{stat.teams.away.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No stats to display.</p>
                        )}
                    </div>
                )}
            </main>

            {/* footer */}
            <footer>
                <img className="w-full grayscale" src={foo} alt="" />
            </footer>
        </div>
    );
};

export default Homepage;
