import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Record } from "../records/Record.js"
import { PeopleContext } from "./PeopleProvider.js"
import "./Student.css"

export const StudentOverview = () => {
    const { activeStudent: student } = useContext(PeopleContext)
    const [score, updateScore] = useState(0)
    const history = useHistory()

    useEffect(() => {
        if ("id" in student) {
            const learningScore = student.records.reduce(
                (total, current) => {
                    return total + current.weights.reduce(
                        (tot, curr) => tot + curr.score, 0
                    )
                }, 0
            )
            updateScore(learningScore)
        }
    }, [student])

    return (
        "id" in student
            ? <div className="card student">
                <div className="card-body">
                    <header className="student__header">
                        <h2 className="card-title student__info">{student.name} ({student.cohorts.map(c => c.name).join(", ")})</h2>
                        <div className="student__score">
                            {score}
                        </div>
                    </header>
                    <div className="card-text">
                        <div className="student__github">
                            Github: <a href={`https://www.github.com/${student.github}`}>
                                {`https://www.github.com/${student.github}`}</a>
                        </div>

                        <details className="student__details">
                            <button className="button button--isi button--border-thick button--round-l button--size-s button--record"
                                onClick={() => {
                                    history.push({
                                        pathname: "/records/new",
                                        state: {
                                            studentId: student.id
                                        }
                                    })
                                }}
                            >
                                <i className="button__icon icon icon-book"></i>
                                <span>New Record</span>
                            </button>

                            <section className="records--overview">
                                {
                                    student.records.map(record => {
                                        return <Record key={`record--${record.id}`} record={record} />
                                    })
                                }
                            </section>
                        </details>
                    </div>
                </div>
            </div>
            : <div></div>
    )
}
