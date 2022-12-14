import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Settings from "../Settings.js"
import { fetchIt } from "../utils/Fetch.js"
import "./CohortForm.css"
import { HelpIcon } from "../../svgs/Help.js"
import { CourseContext } from "../course/CourseProvider.js"


export const CohortForm = () => {
    const [courses, setCourses] = useState([])
    const [chosenCourses, setChosenCourses] = useState(new Set())
    const [cohort, updateCohort] = useState({
        name: "",
        startDate: "",
        endDate: "",
        breakStartDate: "",
        breakEndDate: "",
        slackChannel: ""
    })
    const { getBooks, getCourses } = useContext(CourseContext)
    const history = useHistory()

    useEffect(() => {
        getCourses().then(setCourses)
    }, [])

    const constructNewCohort = () => {
        const courseArray = Array.from(chosenCourses)
        const requestBody = {...cohort, courses: courseArray}
        debugger
        fetchIt(`${Settings.apiHost}/cohorts`, {
            method: "POST",
            body: JSON.stringify(requestBody)
        })
            .then(() => history.push("/students"))
    }

    const handleUserInput = (event) => {
        const copy = { ...cohort }
        copy[event.target.id] = event.target.value
        updateCohort(copy)
    }

    return (
        <>
            <form className="cohortForm view">
                <h2 className="cohortForm__title">New Cohort</h2>
                <div className="form-group">
                    <label htmlFor="name">
                        Cohort name
                        <HelpIcon tip="Day Cohort 62, for example." />
                    </label>
                    <input onChange={handleUserInput}
                        value={cohort.name}
                        type="text" required autoFocus
                        id="name" className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>
                        Instructor Slack Channel ID
                        <HelpIcon tip="Click on the instructor channel name at the top of Slack. Channel ID is at the bottom of pop-up." />
                    </label>
                    <input onChange={handleUserInput}
                        value={cohort.slackChannel}
                        type="text" required
                        id="slackChannel" className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start date</label>
                    <input onChange={handleUserInput}
                        value={cohort.startDate}
                        type="date" required
                        id="startDate" className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End date</label>
                    <input onChange={handleUserInput}
                        value={cohort.endDate}
                        type="date" required
                        id="endDate" className="form-control"
                    />
                </div>

                <fieldset>
                    <div className="form-group">
                        {
                            courses.map(course => {
                                return <button key={`course--${course.id}`}
                                    className={`${chosenCourses.has(course.id) ? "button-28--achieved" : "button-28"}`}
                                    onClick={e => {
                                        e.preventDefault()
                                        const copy = new Set(chosenCourses)
                                        if (copy.size < 2) {
                                            copy.has(course.id) ? copy.delete(course.id) : copy.add(course.id)
                                            setChosenCourses(copy)
                                        }
                                        else {
                                            window.alert("A cohort can only have two courses")
                                        }
                                    }}>
                                    {course.name}
                                </button>
                            })
                        }
                    </div>
                </fieldset>


                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            constructNewCohort()
                        }
                    }
                    className="btn btn-primary"> Create </button>
            </form>
        </>
    )
}
