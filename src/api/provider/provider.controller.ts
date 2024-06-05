import {addProviderDTO, getProviderByIdDTO, updateProviderDTO} from "./provider.dto";
import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import ProviderService from "./provider.service";

export const getProviderById = async (
    req: TypedRequest<getProviderByIdDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const providerId = req.body.id;

        const result = await ProviderService.getProviderById(providerId);

        res.json(result);
    } catch (err) {
        next(err);
    }
}

export const getProviders = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const result = await ProviderService.getProviders();

        res.json(result);
    } catch (err) {
        next(err);
    }
}

export const addProvider = async(
    req: TypedRequest<addProviderDTO>,
    res: Response,
    next: NextFunction
) => {
    try{
        const name = req.body.fornitore;
        const returned = await ProviderService.addProvider(name);

        res.json(returned);
    }
    catch(err){
        next(err);
    }
}

    export const updateProvider = async (
    req: TypedRequest<updateProviderDTO>,
    res: Response,
    next: NextFunction) => {
    try{
    const providerId = req.body.id;
    const provider = req.body.fornitore;

    const result = await ProviderService.updateProvider(providerId, provider);

    res.json(result);
    }
    catch (err) {
    next(err);

    }
}

    export const deleteProvider = async (
    req: TypedRequest<getProviderByIdDTO>,
    res: Response,
    next: NextFunction) => {

    try{
    const providerId = req.body.id;

    const result = await ProviderService.deleteProvider(providerId);

    res.json(result);
    }
    catch (err) {
    next(err);
    }

    }