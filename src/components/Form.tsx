import { Dispatch, useState, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function Form({dispatch, state} : FormProps) {

  const [activity, setActivity] = useState<Activity>({
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
  })

  useEffect(() => {
    if(state.activeId){
      const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectActivity)
    }
  }, [state.activeId])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setActivity({
      ...activity,
      [id]: id === "category" ? Number(value) : value // Convertir siempre a número si es 'category'
    });
  }
  

  const isValidActivity = () => {
    const {name, calories} = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({type: "save-activity", payload: {newActivity: activity}})

    setActivity({
      ...initialState,
      id: uuidv4()
    })

  }

  return (
    <div>
      <form className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría</label>
            <select
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}>

                {categories.map(category => (
                    <option key={category.id}value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad</label>
            <input
                type="text"
                id="name"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}/>
            </div>

            <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorías:</label>
            <input
                type="number"
                id="calories"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. 300 o 500."
                value={activity.calories}
                onChange={handleChange}/>
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />
        </div>
      </form>
    </div>
  )
}