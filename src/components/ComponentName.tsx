import { useState, useEffect } from "react"

// Nokte agar sakhtare object gefetch shode ma fargh darad bayad ma ham sakhtare DataTaype ra taghir dahim !

type DataType = {
    id: number
    title: string
}

const ComponentName: React.FC = () => {

    const [todos, setTodos] = useState<DataType[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null)

    const url: string = 'https://jsonplaceholder.typicode.com/todos'

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error('Faild to fetch user...')
                }

                const resData: DataType[] = await res.json()
                setTodos(resData)

            } catch (error) {
                console.log(error);
                setIsError((error as Error).message)

            } finally {
                setIsLoading(false)
            }

        }

        fetchData()
    }, [])

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>Error: {isError}</h2>

    return (
        <div>
            {todos.map(todo => {
                return (
                    <p key={todo.id}>title:{todo.title}</p>
                )
            })}

        </div>
    )
}
export default ComponentName