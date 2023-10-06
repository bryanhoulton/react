/* tslint:disable */
/* eslint-disable */
/**
 * Ampersand public API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { UpdateInstallationConfigContent } from './UpdateInstallationConfigContent';
import {
    UpdateInstallationConfigContentFromJSON,
    UpdateInstallationConfigContentFromJSONTyped,
    UpdateInstallationConfigContentToJSON,
} from './UpdateInstallationConfigContent';

/**
 * The config of the installation.
 * @export
 * @interface UpdateInstallationRequestInstallationConfig
 */
export interface UpdateInstallationRequestInstallationConfig {
    /**
     * The ID of the revision that this config is based on.
     * @type {string}
     * @memberof UpdateInstallationRequestInstallationConfig
     */
    revisionId?: string;
    /**
     * The person who created the config, in the format of "consumer:{consumer-id}" or "builder:{builder-id}".
     * @type {string}
     * @memberof UpdateInstallationRequestInstallationConfig
     */
    createdBy?: string;
    /**
     * 
     * @type {UpdateInstallationConfigContent}
     * @memberof UpdateInstallationRequestInstallationConfig
     */
    content?: UpdateInstallationConfigContent;
}

/**
 * Check if a given object implements the UpdateInstallationRequestInstallationConfig interface.
 */
export function instanceOfUpdateInstallationRequestInstallationConfig(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateInstallationRequestInstallationConfigFromJSON(json: any): UpdateInstallationRequestInstallationConfig {
    return UpdateInstallationRequestInstallationConfigFromJSONTyped(json, false);
}

export function UpdateInstallationRequestInstallationConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateInstallationRequestInstallationConfig {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'revisionId': !exists(json, 'revisionId') ? undefined : json['revisionId'],
        'createdBy': !exists(json, 'createdBy') ? undefined : json['createdBy'],
        'content': !exists(json, 'content') ? undefined : UpdateInstallationConfigContentFromJSON(json['content']),
    };
}

export function UpdateInstallationRequestInstallationConfigToJSON(value?: UpdateInstallationRequestInstallationConfig | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'revisionId': value.revisionId,
        'createdBy': value.createdBy,
        'content': UpdateInstallationConfigContentToJSON(value.content),
    };
}

