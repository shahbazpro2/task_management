import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/datePicker"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useModalState, useOpenCloseModal } from "@/jotai/modal"
import { CalendarDays, Plus, Trash2, User } from "lucide-react"
import { useState } from "react"
import { ProgressTask } from "./ProgressTask"
import { Checkbox } from "@/components/ui/checkbox"


export const taskDetailModal = "taskDetailModal"

const TaskDetailModal = () => {
    const openCloseModal = useOpenCloseModal()
    const modalVal = useModalState(taskDetailModal)
    const [date, setDate] = useState(new Date())

    const { status } = modalVal || {}

    const onClose = () => {
        openCloseModal({
            key: taskDetailModal,
            status: false
        })
    }

    return (
        <Dialog open={status} >
            <DialogContent className="max-w-[95%] lg:max-w-[40%] pt-2 pb-24" >
                <div className="flex items-center w-full gap-5">
                    <div className="space-y-2 flex w-full items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

                        <Input value="test" />
                    </div>
                    <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>
                <div className="flex items-start gap-3">
                    <div className="w-[75%]">
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" rows={6} value="test" className="resize-none mt-2" />
                        </div>
                        <div className="flex justify-end mt-2">
                            <Button size="sm" variant="outline" >
                                <Plus className="size-5 mr-1" />
                                Add Sub Task</Button>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <Input value="test" />
                            <Button size="sm" variant="outline" className="!bg-green-600" >Add</Button>
                        </div>
                        <div className="bg-gray-900 px-5 py-3 rounded mt-3">
                            <ProgressTask />
                            <div className="space-y-3 mt-3">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex gap-2 w-full items-center">
                                        <Checkbox />
                                        <Input value="Sub Task 1" />
                                    </div>
                                    <div>
                                        <Trash2 className="size-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[25%] pt-8 space-y-2">
                        <button className="w-full border border-slate-800 py-2 rounded text-sm" >Members</button>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="todo">Todo</SelectItem>
                                    <SelectItem value="inprogress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                </div>
                <div className="bg-gray-900 text-white/70 text-sm rounded-b-lg p-3 absolute w-full bottom-0 mt-3 flex gap-5">
                    <div className="flex gap-2 items-center"><User className="size-5" />Created By: Shahbaz</div>
                    <div className="flex gap-2 items-center"> <CalendarDays className="size-5" />Created: 12/12/2021</div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default TaskDetailModal