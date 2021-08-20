

interface Listener{
    ():void;
}
interface Action {
    type: string,
    payload?: any
}
interface Reducer<T> {
    (state: T, action: Action): T
}

export class TestStore<T> {
    private state: T;
    private listeners: Array<Listener> = [];
    constructor(private reducer: Reducer<any>, state: T) {
        this.state = state;
    }
    dispatch(action: Action){
        this.state = this.reducer(this.state, action);
    }
    getState(): T{
        return this.state;
    }
}
