import React, { useContext, useEffect, useRef, useState } from "react"
import { PeopleContext } from "../people/PeopleProvider"
import "./Teams.css"
import slackLogo from "./images/slack.png"

export const WeeklyTeams = () => {
    const { cohortStudents, getCohortStudents } = useContext(PeopleContext)

    const initialTeamState = new Map([
        [1, new Set()],
        [2, new Set()],
        [3, new Set()],
        [4, new Set()],
        [5, new Set()],
        [6, new Set()]
    ])

    const [teamCount, changeCount] = useState(6)
    const [weeklyPrefix, setWeeklyPrefix] = useState("C54")
    const [unassignedStudents, setUnassigned] = useState([])
    const [originalTeam, trackOriginalTeam] = useState(0)
    const [teams, updateTeams] = useState(initialTeamState)


    useEffect(() => {
        if (localStorage.getItem("activeCohort")) {
            const id = parseInt(localStorage.getItem("activeCohort"))
            getCohortStudents(id)
        }
    }, [])

    useEffect(() => {
        setUnassigned(cohortStudents)
    }, [cohortStudents])

    const createStudentBadge = (student) => {
        return <div key={`studentbadge--${student.id}`}
            id={JSON.stringify(student)}
            onDragStart={e => {
                if (e.nativeEvent.path[1].hasAttribute("id")) {
                    trackOriginalTeam(parseInt(e.nativeEvent.path[1].id.split("--")[1]))
                }
                else {
                    trackOriginalTeam(0)
                }
                e.dataTransfer.setData("text/plain", e.target.id)
            }}
            draggable={true} className="student--badge">
            {student.name}
        </div>
    }


    const makeTeamBoxes = () => {
        let boxes = []

        for (let i = 1; i <= teamCount; i++) {
            boxes.push(
                <div id={`teambox--${i}`} key={`teambox--${i}`} className="team"
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault()
                        const data = e.dataTransfer.getData("text/plain")
                        const studentId = JSON.parse(data).id

                        const badge = document.getElementById(data)
                        // e.target.appendChild(badge)

                        // Add div to new team Set
                        const copy = new Map(teams)
                        copy.get(i).add(data)

                        // If dragged from another team, remove from original
                        if (originalTeam !== 0) {
                            copy.get(originalTeam).delete(data)
                        }

                        updateTeams(copy)
                    }}
                >
                    Team {i}
                    <img className="icon--slack" src={slackLogo} alt="Create Slack team channel" />
                    {
                        Array.from(teams.get(i)).map(
                            (studentJSON) => {
                                const student = JSON.parse(studentJSON)
                                return createStudentBadge(student)
                            }
                        )
                    }
                </div>
            )
        }

        return boxes
    }

    const autoAssignStudents = () => {
        cohortStudents.sort((current, next) => next.score - current.score)
        const studentsPerTeam = Math.floor(cohortStudents.length / teamCount)
        const teamsCopy = new Map(teams)
        let remainingStudents = cohortStudents.length - (studentsPerTeam * teamCount)


        let boxNumber = 1
        let studentIndex = 0
        for (let i = 1; i <= teamCount; i++) {

            let studentsToAddToBox = studentsPerTeam
            if (boxNumber <= remainingStudents) {
                studentsToAddToBox = studentsPerTeam + 1
            }
            for (let j = 0; j < studentsToAddToBox; j++) {
                const student = cohortStudents[studentIndex]

                // Move the div element to the correct team
                const studentBadge = document.getElementById(JSON.stringify(student))
                const box = document.getElementById(`teambox--${boxNumber}`)
                box.appendChild(studentBadge)

                // Update the state to put the student id in the right Set
                teamsCopy.get(boxNumber).add(student.id)

                studentIndex++
            }

            boxNumber += 1
        }
    }

    return (
        <article className="teamView">
            <h1>Weekly Teams</h1>

            <section className="teamsconfig">
                <div>
                    How many teams: <input type="number"
                        className="teamsconfig__count"
                        value={teamCount}
                        onChange={e => changeCount(parseInt(e.target.value))} />
                </div>
                <div>
                    Slack channel prefix: <input type="text"
                        className="teamsconfig__prefix"
                        value={weeklyPrefix}
                        onChange={e => changeCount(parseInt(e.target.value))} />
                </div>
                <div className="teamsconfig__auto">
                    <button onClick={autoAssignStudents}>
                        Assign By Score
                    </button>
                </div>
                <div className="teamsconfig__save">
                    <button onClick={() => {
                        const serializableMap = Array.from(teams)
                        const convertible = serializableMap.map(
                            ([id, studentSet]) => {
                                return {
                                    id,
                                    students: Array.from(studentSet)
                                }
                            }
                        )
                        console.log(JSON.stringify(convertible))
                        localStorage.setItem("currentCohortTeams", JSON.stringify(convertible))
                    }}>
                        Save
                    </button>
                </div>
                <div className="teamsconfig__clear">
                    <button onClick={() => {
                        updateTeams(initialTeamState)
                    }}>
                        Clear
                    </button>
                </div>
            </section>

            <hr />

            <article className="teams">
                {makeTeamBoxes()}
            </article>
            <article className="students--teambuilder">
                {
                    unassignedStudents
                        .sort((current, next) => next.score - current.score)
                        .map(createStudentBadge)
                }
            </article>
        </article>
    )
}