import React from "react"
import { CohortSearch } from "../cohorts/CohortSearch"
import { StudentOverview } from "../people/StudentOverview"
import { StudentSearch } from "../people/StudentSearch"
import { DailyStatusDialog } from "./DailyStatusDialog"
import { FeedbackDialog } from "./FeedbackDialog"
import "./Dashboard.css"

export const Dashboard = () => {
    return <main className="dashboard">
        <div className="dashboard__component dashboard__cohorts">
            <CohortSearch />
        </div>
        <div className="dashboard__component dashboard__students">
            <StudentSearch />
            <StudentOverview />
        </div>

        <DailyStatusDialog />
        <FeedbackDialog />
    </main>
}