import actions from './actions';
import {combineReducers} from 'redux';

export const LOCATIONS = {
    TRANSPORTER_ROOM: 'TRANSPORTER_ROOM',
    LOCATION_SHIP: 'LOCATION_SHIP',
    PLANET_EARTH: 'PLANET_EARTH',
    SUN: 'SUN'
}

const ships = (state=[], action) => {
    switch (action.type) {
        case actions.ADD_SHIP:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    crystals: 0,
                    max_load: action.max_load
                }
            ]
        case actions.TRANSFER_CRYSTALS:
            return state.map((ship) => (
                (action.shipId === ship.id) ? {...ship, crystals: ship.crystals + action.howMany} : ship
            ));
        default:
            return state;
    }
}

const planets = (state = [], action) => {
    switch(action.type) {
        case actions.ADD_PLANET:
            return [
                ...state,
                {
                    name: action.name,
                    id: action.id,
                    crystals: action.crystals
                }
            ]
        case actions.TRANSFER_CRYSTALS:
            return state.map((planet) => (
                (action.planetId === planet.id) ? {...planet, crystals: planet.crystals - action.howMany} : planet
            ));
        default:
            return state;
    }
}

const crewMembers = (state = [], action) => {
    switch(action.type) {
        case actions.ADD_MEMBER:
            // Equivalent to state.concat version, using spread operator
            return [
                ...state,
                {
                    name: action.name,
                    rank: action.rank,
                    id: action.id,
                    location: action.location,
                    carry_capacity: action.capacity 
                }
            ]
            // return state.concat({
            //     name: action.name,
            //     rank: action.rank,
            //     id: action.id,
            //     location: action.location
            // })
        case actions.BEAM_MEMBER:
            return state.map((crewMember) => {
                if(action.id === crewMember.id && action.location in LOCATIONS) {
                    let newLocation = action.location;
                    return {
                        ...crewMember,
                        location: newLocation
                    }
                    // Longer version of Object cloning
                    // return Object.assign({}, crewMember, {location: action.location});
                } else {
                    return crewMember;
                }
            });
        default:
            return state;

    }
}

export default combineReducers({
    crewMembers,
    ships,
    planets
});