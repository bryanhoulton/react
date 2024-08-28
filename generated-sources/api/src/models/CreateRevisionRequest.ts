/* tslint:disable */
/* eslint-disable */
/**
 * Ampersand public API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * The source of the revision to create. One of sourceZipUrl or sourceYaml is required.
 * @export
 * @interface CreateRevisionRequest
 */
export interface CreateRevisionRequest {
    /**
     * URL of where a zip of the source files can be downloaded (e.g. Google Cloud Storage URL).
     * @type {string}
     * @memberof CreateRevisionRequest
     */
    sourceZipUrl?: string;
    /**
     * The source YAML file that defines the revision.
     * @type {string}
     * @memberof CreateRevisionRequest
     */
    sourceYaml?: string;
}

/**
 * Check if a given object implements the CreateRevisionRequest interface.
 */
export function instanceOfCreateRevisionRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateRevisionRequestFromJSON(json: any): CreateRevisionRequest {
    return CreateRevisionRequestFromJSONTyped(json, false);
}

export function CreateRevisionRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateRevisionRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sourceZipUrl': !exists(json, 'sourceZipUrl') ? undefined : json['sourceZipUrl'],
        'sourceYaml': !exists(json, 'sourceYaml') ? undefined : json['sourceYaml'],
    };
}

export function CreateRevisionRequestToJSON(value?: CreateRevisionRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sourceZipUrl': value.sourceZipUrl,
        'sourceYaml': value.sourceYaml,
    };
}

