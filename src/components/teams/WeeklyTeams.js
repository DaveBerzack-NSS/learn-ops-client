import React, { useContext, useEffect, useState } from "react"
import { PeopleContext } from "../people/PeopleProvider"
import "./Teams.css"

export const WeeklyTeams = () => {
    const [teamCount, changeCount] = useState(6)
    const { cohortStudents, getCohortStudents } = useContext(PeopleContext)

    useEffect(() => {
        if (localStorage.getItem("activeCohort")) {
            const id = parseInt(localStorage.getItem("activeCohort"))
            getCohortStudents(id)
        }
    }, [])


    const makeTeamBoxes = () => {
        let boxes = []

        for (let i = 1; i <= teamCount; i++) {
            boxes.push(
                <div id={`teambox--${i}`} key={`teambox--${i}`} className="team"
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault()
                        const data = e.dataTransfer.getData("text/plain")
                        e.target.appendChild(document.getElementById(data))

                    }}
                >Team {i}</div>
            )
        }

        return boxes
    }

    return (
        <>
            <h1>Weekly Teams</h1>

            <div>
                How many teams: <input type="number"
                    value={teamCount}
                    onChange={e => changeCount(parseInt(e.target.value))} />
            </div>
            <div>
                <button onClick={e => {
                    cohortStudents.sort((current, next) => next.score - current.score)
                    const studentsPerTeam = Math.floor(cohortStudents.length / teamCount)
                    console.log("studentsPerTeam", studentsPerTeam)
                    let remainingStudents = cohortStudents.length - (studentsPerTeam * teamCount)
                    console.log("remainingStudents", remainingStudents)

                    let boxNumber = 1
                    let studentIndex = 0
                    for (let i = 1; i <= teamCount; i++) {

                        let studentsToAddToBox = studentsPerTeam
                        if (boxNumber <= remainingStudents) {
                            studentsToAddToBox = studentsPerTeam + 1
                        }
                        for (let j = 0; j < studentsToAddToBox; j++) {
                            const student = cohortStudents[studentIndex]
                            const studentBadge = document.getElementById(JSON.stringify(student))
                            const box = document.getElementById(`teambox--${boxNumber}`)
                            box.appendChild(studentBadge)
                            studentIndex++
                        }

                        console.log(boxNumber, remainingStudents, studentsToAddToBox, studentIndex)
                        boxNumber += 1
                    }

                }}
                >Assign By Score</button>
            </div>

            <article className="teams">
                {makeTeamBoxes()}
            </article>
            <article className="students--teambuilder">
                {
                    cohortStudents
                        .sort((current, next) => next.score - current.score)
                        .map(s => (
                            <div key={`studentbadge--${s.id}`}
                                id={JSON.stringify(s)}
                                onDragStart={e => {
                                    e.dataTransfer.setData("text/plain", e.target.id)
                                }}
                                draggable={true} className="student--badge">
                                {s.name}
                            </div>
                        ))
                }
            </article>
        </>
    )
}
