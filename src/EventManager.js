const EventDispatcher = require('./EventDispatcher.js');

class EventManager
{
    constructor()
    {
        this.events = {};
    }

    dispatch(eventName, data)
    {
        const event = this.events[eventName];
        if(event)
        {
            event.fire(data);
        }
    }

    on(eventName, callback)
    {
        let event = this.events[eventName];
        if(!event)
        {
            event = new EventDispatcher(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(callback);
    }

    off(eventName, callback)
    {
        const event = this.events[eventName];
        if(event && event.callbacks.indexOf(callback) > -1)
        {
            event.unregisterCallback(callback);
            if(event.callbacks.length === 0)
            {
                delete this.events[eventName];
            }
        }
    }
}

module.exports = EventManager;
