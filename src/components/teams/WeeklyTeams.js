import React, { useContext, useEffect, useState } from "react"
import { PeopleContext } from "../people/PeopleProvider"
import "./Teams.css"

export const WeeklyTeams = () => {
    const [teamCount, changeCount] = useState(0)
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
                <div
                    onDragOver={e => e.preventDefault()}
                    onDragStart={e => e.dataTransfer.setData("text", e.target.id)}
                    onDrop={e => {
                        e.preventDefault()
                        const data = e.dataTransfer.getData("text")
                        e.target.appendChild(document.getElementById(data))

                    }}
                    key={`teambox--${i}`} className="team">Team {i}</div>
            )
        }

        return boxes
    }

    return (
        <>
            Weekly Teams

            <div>
                How many teams: <input type="number"
                    value={teamCount}
                    onChange={e => changeCount(parseInt(e.target.value))} />
            </div>
            <div>
                <button>Create</button>
            </div>

            <article className="teams">
                {makeTeamBoxes()}
            </article>
            <article className="students--teambuilder">
                {
                    cohortStudents.map(s => <div draggable={true} key={`studentbadge--${s.id}`} className="student--badge">{s.name}</div>)
                }
            </article>
        </>
    )
}
