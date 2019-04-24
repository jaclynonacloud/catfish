import { Logging } from "./Functions";
import { Entity } from "./entities/Entity";

export interface IPoolObject {
    type:string;
    obj:Entity,
    active:boolean;
}

export class ObjectPool {
    private static _pool:IPoolObject[];

    /*--------------- METHODS ------------------------*/
    /**Creates a pool object. */
    public static createPoolObject(obj:Entity, type:string) {
        const poolObj = {
            type,
            obj,
            active: false
        };
        ObjectPool.Pool.push(poolObj);
        return poolObj;
    }

    /**Checks out a pool object.  Use POOL global function to access. */
    public static checkout(type:string) {
        const poolObj = ObjectPool._getObjectByType(type);
        if(poolObj != null) {
            poolObj.active = true;
            return poolObj.obj;
        }
        return null;
    }

    /**Returns an object to the pool. */
    public static return(obj:Entity) {
        const poolObj = ObjectPool._getObjectByObj(obj);
        if(poolObj != null) {
            poolObj.active = false;
            return true;
        }
        return false;
    }

    /**Returns all objects to pool. */
    public static releaseAllObjects() {
        ObjectPool._pool.forEach(p => {
            ObjectPool.return(p.obj);
        });
    }


    public static _getObjectByType(type) {
        const poolObj = ObjectPool._pool.find((o => o.type == type && !o.active));
        if(poolObj == null) Logging.error("Object not found in pool, or pool is exhausted.  Return some objects.");
        return poolObj
    }
    public static _getObjectByObj(obj) {
        return ObjectPool._pool.find((o => o.obj == obj));
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get Pool() { 
        if(ObjectPool._pool == null) ObjectPool._pool = [];
        return ObjectPool._pool;
    }
}