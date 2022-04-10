
// Interfaces

// Action Interfaces
export interface FetchTicketListsActionTypes {
  items: any[];
}

export interface GenerateTicketActionTypes {
  item: Record<string, any>;
}
// Action Interfaces


// Reducers Interfaces
export interface StateTypes {
  items: any[];
  total_count: number;
  isError: boolean;
  errors: Record<string, any>;
  isFetching: boolean;
}

export interface ActionTypes {
  type: string;
  items: any[];
  item: Record<string, any>;
  id: number;
}
// Reducers Interfaces