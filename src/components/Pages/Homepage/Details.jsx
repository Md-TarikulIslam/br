import React, { useEffect, useState } from "react";
import nav from "../../../images/nav.png";
import foo from "../../../images/foo.png";
import axios from "axios";
import Loading from "../../../assests/loading.svg";

const Details = () => {
    const [statistics, setStatistics] = useState({});
    const [results, setResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const data = localStorage.getItem("fixture");
    const fixtureId = localStorage.getItem("fixtureId");
    const fixture = JSON.parse(data);
    const limit = [15, 15, 50, 15, 25, 25, 25, 25, 15, 100, 10, 5, 25, 1000, 750, 100, 10];

    const fetchStatistics = async () => {
        setLoading(true);
        const options = {
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics",
            params: { fixture: fixtureId },
            headers: {
                "X-RapidAPI-Key": "b6e89817d6msh36107de73277139p116779jsne307fb015e33",
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setStatistics(response.data.response);
            setResults(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    const mergedStatistics = [];
    if (results !== 0) {
        // Loop through each type of statistic
        statistics[0].statistics.forEach((stat, idx) => {
            const homeStat = stat;
            const awayStat = statistics[1].statistics.find((s) => s.type === stat.type);

            if (awayStat) {
                mergedStatistics.push({
                    type: stat.type,
                    home: homeStat.value,
                    away: awayStat.value,
                    limit: limit[idx],
                });
            }
        });
    }

    return (
        <div>
            {/* navbar */}
            <nav>
                <img className="w-full" src={nav} alt="" />
            </nav>

            {/* main body */}
            <main className="mx-auto max-w-screen-xl my-5">
                <div className="card px-8 py-6 shadow bg-blue-50 hover:cursor-pointer">
                    <div className="flex items-center">
                        <div className="flex-1 flex items-center gap-5 justify-start">
                            <p className="font-bold text-xl">{fixture.teams.home.name}</p>
                            <img
                                className="w-10 h-10"
                                src={fixture.teams.home.logo}
                                alt={`${fixture.teams.home.name} logo`}
                            />
                        </div>
                        <div className="flex-1 text-center vs text-xl text-red-500">v/s</div>
                        <div className="flex-1 flex items-center gap-5 justify-end">
                            <img
                                className="w-10 h-10"
                                src={fixture.teams.away.logo}
                                alt={`${fixture.teams.away.name} logo`}
                            />
                            <p className="font-bold text-xl ">{fixture.teams.away.name}</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="w-full min-h-[calc(100vh-300px)] flex justify-center items-center">
                        <img className="w-10 h-10" src={Loading} alt="loading" />
                    </div>
                ) : (
                    <>
                        {/* progress */}
                        {results > 0 ? (
                            <div className="mb-14">
                                {mergedStatistics.map((statistics, idx) => (
                                    <div key={idx}>
                                        <div className="w-full my-6">
                                            <p className="text-center font-bold text-blue-600">{statistics.type}</p>
                                            <div className="flex items-center justify-between gap-3 md:gap-4 lg:gap-6">
                                                <div className="w-full">
                                                    <div className="flex items-center justify-between">
                                                        <p>{statistics.limit}</p>
                                                        <p>{statistics.home === null ? 0 : statistics.home}</p>
                                                    </div>
                                                    <progress
                                                        className={`${
                                                            statistics.home > statistics.away
                                                                ? "progress_0"
                                                                : "progress_1"
                                                        } w-full !h-4`}
                                                        style={{ direction: "rtl" }}
                                                        value={
                                                            statistics.home === null
                                                                ? 0
                                                                : typeof statistics.home === "string"
                                                                ? parseInt(statistics.home.replace("%", ""))
                                                                : statistics.home
                                                        }
                                                        max={statistics.limit}
                                                    ></progress>
                                                </div>
                                                <div className="w-full">
                                                    <div className="flex items-center justify-between">
                                                        <p>{statistics.away === null ? 0 : statistics.away}</p>
                                                        <p>{statistics.limit}</p>
                                                    </div>
                                                    <progress
                                                        className={`${
                                                            statistics.away > statistics.home
                                                                ? "progress_0"
                                                                : "progress_1"
                                                        } w-full !h-4`}
                                                        value={
                                                            statistics.away === null
                                                                ? 0
                                                                : typeof statistics.away === "string"
                                                                ? parseInt(statistics.away.replace("%", ""))
                                                                : statistics.away
                                                        }
                                                        max={statistics.limit}
                                                    ></progress>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <p>No statistics to display.</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* footer */}
            <footer>
                <img className="w-full grayscale" src={foo} alt="" />
            </footer>
        </div>
    );
};

export default Details;
