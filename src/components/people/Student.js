import React, { useContext } from "react"
import { AssessmentIcon } from "../../svgs/AssessmentIcon.js"
import { GlobeIcon } from "../../svgs/GlobeIcon.js"
import { NoteIcon } from "../../svgs/NoteIcon.js"
import { PeopleContext } from "./PeopleProvider.js"

export const Student = ({ student }) => {

    return (
        <>
            <div className={`personality--${student.personality} student`}>
                <div className="student__actions">
                    <span className="action action--notes">
                        <NoteIcon tip="Enter in your notes about this student" />
                    </span>
                    <span className="action action--progress">
                        <GlobeIcon tip="Update current book and project" />
                    </span>
                    <span className="action action--assessments">
                        <AssessmentIcon tip="View and assign self-assessments to student" />
                    </span>
                </div>
                <div className="student__header">
                    <h4 className="student__name">{student.name.split("").slice(0,15).join("")}</h4>
                    <div className="student__book">
                        {student.book.name}
                    </div>
                    <div className="student__project">
                        {student.book.project}
                    </div>
                </div>
                <div className="student__footer">
                    <div>
                        {student.score}
                    </div>
                    <div>
                        {
                            student.proposals.map(p => {
                                if (p.status === "submitted") {
                                    return "📕"
                                }
                                else if (p.status === "reviewed") {
                                    return "📒"
                                }
                                else if (p.status === "approved") {
                                    return "📗"
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
