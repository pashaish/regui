import { TreeNode } from "../../types/tree"

interface InitialState {
    searchField: string;
    tree: TreeNode;
}

const initialState: InitialState = {
    searchField: '',
    tree: {},
}

interface Action {
    type: string;
}

export const viewerReducer = (state = initialState, action: Action) => {

}