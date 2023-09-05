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
    const title = ["Form", "Attack", "Deffence", "Poisson Distribution", "Strength", "Goals"];
    const [date, setDate] = useState(null);
    const [predict, setPredict] = useState([]);

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

    const fetchPredictions = async () => {
        setLoading(true);
        const options = {
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v3/predictions",
            params: { fixture: fixtureId },
            headers: {
                "X-RapidAPI-Key": "b6e89817d6msh36107de73277139p116779jsne307fb015e33",
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setPredict(response.data.response[0]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    useEffect(() => {
        fetchPredictions();
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

    const covertDate = (date) => {
        const parsedDate = new Date(date);

        const ordinalSuffixes = ["th", "st", "nd", "rd"];

        const day = parsedDate.getDate();
        const dayWithSuffix = day + (ordinalSuffixes[(day - 1) % 10] || "th");

        const formattedDate =
            dayWithSuffix +
            " " +
            parsedDate.toLocaleDateString("en-US", {
                month: "long", // Full month name (e.g., "September")
                year: "numeric", // Full year (e.g., "2023")
            });

        setDate(formattedDate);
    };

    useEffect(() => {
        covertDate(fixture.fixture.date);
    }, []);

    const newArray = [];
    for (const key in predict.comparison) {
        if (predict.comparison.hasOwnProperty(key)) {
            const value = predict.comparison[key];
            newArray.push({ key, value });
        }
    }

    console.log(newArray);

    return (
        <div>
            {/* navbar */}
            <nav>
                <img className="w-full" src={nav} alt="" />
            </nav>

            {/* main body */}
            <main className="mx-auto max-w-screen-xl my-5">
                <div className="card px-8 py-6 shadow bg-blue-50">
                    <div className="flex items-center justify-between gap-10">
                        <div className="flex-1 flex flex-col-reverse md:flex-row items-center gap-5 justify-start">
                            <p className="font-bold text-lg md:text-xl text-center">{fixture.teams.home.name}</p>
                            <img
                                className="w-14 h-14"
                                src={fixture.teams.home.logo}
                                alt={`${fixture.teams.home.name} logo`}
                            />
                        </div>
                        <div className="flex-1 text-center vs text-xl text-red-500">v/s</div>
                        <div className="flex-1 flex flex-col md:flex-row items-center gap-5 justify-end">
                            <img
                                className="w-14 h-14"
                                src={fixture.teams.away.logo}
                                alt={`${fixture.teams.away.name} logo`}
                            />
                            <p className="font-bold text-lg md:text-xl text-center">{fixture.teams.away.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <h3 className="font-bold text-center md:text-lg mt-2 text-blue-700">
                            {fixture.league.name} - {date} -{" "}
                            {fixture.fixture.venue.city ? fixture.fixture.venue.city : "World"}
                        </h3>
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
                                                    <div className="text-right">
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
                                                    <div className="text-left">
                                                        <p>{statistics.away === null ? 0 : statistics.away}</p>
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
                            <div className="mb-14 flex flex-col items-center mt-8">
                                <h2 className="text-xl font-bold">Head To Head</h2>

                                {/* <div className="flex lg:hidden justify-evenly w-full my-4">
                                    <div className="bg-blue-500 w-36 h-36 rounded-full flex justify-center items-center flex-col text-white">
                                        <p className="font-semibold">Win Percentage</p>
                                        <p className="text-2xl font-black">{predict?.comparison?.total?.home}</p>
                                    </div>
                                    <div className="bg-blue-500 w-36 h-36 rounded-full flex justify-center items-center flex-col text-white">
                                        <p className="font-semibold">Win Percentage</p>
                                        <p className="text-2xl font-black">{predict?.comparison?.total?.away}</p>
                                    </div>
                                </div> */}

                                <div className="w-full flex justify-around items-center">
                                    {/* <div className="hidden lg:flex bg-blue-500 w-44 h-44 rounded-full justify-center items-center flex-col text-white">
                                        <p className="font-semibold">Win Percentage</p>
                                        <p className="text-2xl font-black">{predict?.comparison?.total?.home}</p>
                                    </div> */}

                                    <div className="w-full lg:w-[55%]">
                                        {newArray.map((item, idx) => (
                                            <>
                                                {idx !== newArray.length - 1 && (
                                                    <div key={idx} className="w-full my-3">
                                                        <p className="text-center font-bold text-blue-600">
                                                            {title[idx]}
                                                        </p>
                                                        <div className="flex items-center justify-between w-full gap-2 md:gap-3 lg:gap-4">
                                                            <div className="w-full">
                                                                <div className="text-right">
                                                                    <p>
                                                                        {item.value.home === null ? 0 : item.value.home}
                                                                    </p>
                                                                </div>
                                                                <progress
                                                                    className={`${
                                                                        item.value.home >= item.value.away
                                                                            ? "progress_0"
                                                                            : "progress_1"
                                                                    } w-full !h-4`}
                                                                    style={{ direction: "rtl" }}
                                                                    value={
                                                                        item.value.home === null
                                                                            ? 0
                                                                            : typeof item.value.home === "string"
                                                                            ? parseInt(item.value.home.replace("%", ""))
                                                                            : item.value.home
                                                                    }
                                                                    max={100}
                                                                ></progress>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="text-left">
                                                                    <p>
                                                                        {item.value.away === null ? 0 : item.value.away}
                                                                    </p>
                                                                </div>
                                                                <progress
                                                                    className={`${
                                                                        item.value.away >= item.value.home
                                                                            ? "progress_0"
                                                                            : "progress_1"
                                                                    } w-full !h-4`}
                                                                    value={
                                                                        item.value.away === null
                                                                            ? 0
                                                                            : typeof item.value.away === "string"
                                                                            ? parseInt(item.value.away.replace("%", ""))
                                                                            : item.value.away
                                                                    }
                                                                    max={100}
                                                                ></progress>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ))}
                                    </div>

                                    {/* <div className="hidden lg:flex bg-blue-500 w-44 h-44 rounded-full justify-center items-center flex-col text-white">
                                        <p className="font-semibold">Win Percentage</p>
                                        <p className="text-2xl font-black">{predict?.comparison?.total?.away}</p>
                                    </div> */}
                                </div>
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
