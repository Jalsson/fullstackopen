import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({good, neutral, bad}) => {
    return (
        <table>
            <tbody>
                <StatisticLine text="Good" value={good} />
                <StatisticLine text="Neutral" value={neutral} />
                <StatisticLine text="Bad" value={bad} />
                <ul>
                    <li>
                        <span>All {good + neutral + bad}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>Average {(good - bad) / (good + neutral + bad)}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>Positive {(good / (good + neutral + bad)) * 100}%</span>
                    </li>
                </ul>
            </tbody>
        </table>
    );
};

export default Statistics;