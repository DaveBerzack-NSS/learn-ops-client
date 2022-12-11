import React, { useContext, useEffect, useState } from "react"
import useModal from "../ui/useModal"
import { FeedbackDialog } from "./FeedbackDialog"
import { StudentCardList } from "../cohorts/StudentCardList"
import { CohortSearchField } from "../cohorts/CohortSearchField"
import { CohortOperations } from "../cohorts/CohortOperations"
import { CourseContext } from "../course/CourseProvider"
import { StudentSearch } from "../people/StudentSearch"
import "./Dashboard.css"

export const Dashboard = () => {
    const { getLearningObjectives } = useContext(CourseContext)
    const [searchTerms, setSearchTerms] = useState([])

    useEffect(() => {
        getLearningObjectives()
    }, [])

    return <main className="dashboard">
        <section className="cohortActions">
            <CohortSearchField />
            <StudentSearch setSearchTerms={setSearchTerms} searchTerms={searchTerms} />
            <CohortOperations />
        </section>

        <StudentCardList searchTerms={searchTerms} />

        <FeedbackDialog />
    </main>
}
