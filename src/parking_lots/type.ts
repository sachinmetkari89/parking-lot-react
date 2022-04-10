
// Interfaces

export interface ChangeParkingLotStatusPayloadType {
  parking_lot_id: number;
  status: string;
}

export interface FetchParkingListsActionPayloadType {
  items: any[];
}

export interface GenerateParkingListActionType {
  item: Record<string, any>;
}

export interface ActionTypes {
  type: string;
  items: any[];
  item: Record<string, any>;
  id: number;
  parking_lot_id: number;
  status: string;
}

export interface StateTypes {
  items: any[];
  total_count: number;
  isError: boolean;
  errors: Record<string, any>;
  isFetching: boolean;
}