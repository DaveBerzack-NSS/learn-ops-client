import React, { useContext, useEffect, useRef, useState } from "react"
import { PeopleContext } from "../people/PeopleProvider"
import Settings from "../Settings"
import { fetchIt } from "../utils/Fetch"
import { StudentNoteList } from "../people/StudentNoteList"

export const StudentNoteDialog = ({ toggleNote, noteIsOpen }) => {
    const { activeStudent, getStudentNotes } = useContext(PeopleContext)
    const [message, setMessage] = useState("")
    const [notes, setNotes] = useState([])
    const note = useRef(null)

    useEffect(() => {
        if (note && note.current && noteIsOpen) {
            note.current.focus()
        }
    }, [noteIsOpen])

    useEffect(() => {
        if (activeStudent && "id" in activeStudent) {
            getNotes()
        }
    }, [activeStudent])

    const getNotes = () => {
        getStudentNotes(activeStudent.id).then(setNotes).then(() => note.current.focus())
    }

    const createStudentNote = (e) => {
        return fetchIt(`${Settings.apiHost}/notes`, {
            method: "POST",
            body: JSON.stringify({ note: message, studentId: activeStudent.id })
        })
    }

    return <dialog id="dialog--note" className="dialog--note" open={noteIsOpen}>
        <div className="form-group">
            <label>Add Note:</label>
            <input type="text" id="statusText"
                className="form-control form-control--dialog"
                ref={note}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={
                    e => {
                        if (e.key === "Enter") {
                            createStudentNote().then(getNotes).then(() => {
                                setMessage("")
                            })
                        } else if (e.key === "Escape") {
                            toggleNote()
                        }
                    }
                }
            />
        </div>

        <button className="fakeLink" style={{
            position: "absolute",
            top: "0.33em",
            right: "0.5em",
            fontSize: "0.75rem"
        }}
            id="closeBtn"
            onClick={() => toggleNote()}>[ close ]</button>

        <StudentNoteList notes={notes} />
    </dialog>
}
