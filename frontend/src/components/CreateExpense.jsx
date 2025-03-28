import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "@/redux/expenseSlice";
const CreateExpense = () => {
    const[formData,setFormData]=useState({
        description:"",
        amount:"",
        category:""
    });
    const[loading,setLoading]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const dispatch=useDispatch();
    const expenses=useSelector(store=>store.expense);
    const changeEventHandler=(e)=>{
        const {name,value}=e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
    const changeCategoryHandler=(value)=>{
        setFormData((prevData)=>({
            ...prevData,
            category:value
        }))
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/v1/expense/add", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
    
            if (res.data.success) {
                dispatch(setExpenses((prev) => [...prev, res.data.expense])); // Ensure Redux updates properly
                toast.success(res.data.message);
    
                setTimeout(() => setIsOpen(false), 100); // Ensure modal closes properly
                setFormData({ description: "", amount: "", category: "" }); // Reset form
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add expense");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>Add New Expense</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                        Create expense to here. Click add when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                placeholder="description"
                                className="col-span-3"
                                name="description"
                                value={formData.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                placeholder="xxx in ₹"
                                className="col-span-3"
                                name="amount"
                                value={formData.amount}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <Select onValueChange={changeCategoryHandler}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="rent">Rent</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="salary">Salary</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        {
                            loading ? (
                                <Button className='w-full my-4'>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Add</Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default CreateExpense;