import { apiClientRequest } from './index';

export async function specializationCategory(url: string, key: string, auth: any) {
  return await apiClientRequest(url, key, auth).get('/specialization-category');
}

export async function emrCategory(url: string, key: string, auth: any) {
  return await apiClientRequest(url, key, auth).get('/emr-category');
}

export async function serviceCategory(url: string, key: string, auth: any) {
  return await apiClientRequest(url, key, auth).get('/service-category');
}

export async function dnaCollectionProcess(url: string, key: string, auth: any) {
  return await apiClientRequest(url, key, auth).get('/dna-collection-process');
}