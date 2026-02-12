# Firestore Security Rules Documentation

## Overview

These security rules enforce strict data isolation, schema validation, and abuse prevention for the Elevation Loom application.

## Key Security Features

### 1. User Isolation
- Users can only read/write documents under their own UID
- Enforced via `isOwner(userId)` check on all operations
- No cross-user data access possible

### 2. Schema Validation

**WeekData Structure:**
- `isoYear` (int): ISO year
- `isoWeek` (int): ISO week number (1-53)
- `target` (map): { value: number, unit: string }
- `dailyLogs` (array): Up to 7 entries, each with:
  - `date` (string): YYYY-MM-DD format
  - `value` (number): 0 to 100,000 meters
  - `memo` (optional string)
- `createdAt` (timestamp): Document creation time
- `updatedAt` (timestamp): Last update time

### 3. Abuse Prevention

**Payload Size Limits:**
- Maximum 7 daily logs per week
- Maximum 100km elevation per day (sanity check)
- Memo fields must be strings (no binary data)

**Rate Limiting:**
- Minimum 1 second between successive writes to same document
- Prevents rapid-fire write abuse
- Does not affect normal usage

**Timestamp Protection:**
- `createdAt` cannot be modified after creation
- `updatedAt` must be newer than previous value
- Prevents timestamp manipulation

### 4. Operation-Specific Rules

**Read Operations:**
- Requires authentication (`isAuthenticated()`)
- Must be document owner (`isOwner(userId)`)
- No special conditions

**Create Operations:**
- Requires authentication and ownership
- Full schema validation
- Size limits enforced

**Update Operations:**
- All create checks apply
- Additional rate limiting (1 second minimum)
- Timestamp integrity checks
- Cannot modify `createdAt`

**Delete Operations:**
- Requires authentication and ownership
- No additional checks

## Rule Functions

### `isAuthenticated()`
Checks if user is authenticated (has valid auth token).

### `isOwner(userId)`
Validates that authenticated user's UID matches the document owner.

### `isValidWeekData()`
Validates complete WeekData schema structure and types.

### `isValidDailyLog(log)`
Validates individual daily log entry structure.

### `isReasonableSize()`
Enforces payload size limits to prevent abuse.

### `isNotTooFrequent()`
Implements basic rate limiting (1 second between writes).

## Testing Rules

### Using Firebase Emulator

```bash
# Start Firestore emulator
firebase emulators:start --only firestore

# Run tests against emulator
npm run test:firestore
```

### Manual Testing

```javascript
// Test read access
firebase.firestore()
  .doc('users/testUserId/weeks/2026-W07')
  .get()
  .then(doc => console.log('Read successful'))
  .catch(err => console.error('Read denied:', err));

// Test write with valid data
firebase.firestore()
  .doc('users/testUserId/weeks/2026-W07')
  .set({
    isoYear: 2026,
    isoWeek: 7,
    target: { value: 5000, unit: 'm' },
    dailyLogs: [
      { date: '2026-02-10', value: 800 }
    ],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => console.log('Write successful'))
  .catch(err => console.error('Write denied:', err));
```

## Common Error Messages

### "Missing or insufficient permissions"
- User is not authenticated
- User is trying to access another user's data
- Check that `request.auth.uid` matches `userId` in path

### "Document does not match validation"
- Schema validation failed
- Check all required fields are present
- Verify field types match expectations

### "Rate limit exceeded"
- Too many writes in short time
- Wait at least 1 second between writes to same document

## Deployment

### Deploy Rules to Firebase

```bash
# Deploy rules only
firebase deploy --only firestore:rules

# Deploy with indexes
firebase deploy --only firestore
```

### Verify Deployment

```bash
# Check active rules
firebase firestore:rules list

# View current rules
firebase firestore:rules get
```

## Security Considerations

### Strengths
- ✅ Complete user isolation
- ✅ Comprehensive schema validation
- ✅ Abuse prevention (rate limiting, size limits)
- ✅ Timestamp integrity protection
- ✅ No cross-user data leakage possible

### Limitations
- ⚠️ Rate limiting is basic (1 second minimum)
- ⚠️ Does not prevent total write volume abuse
- ⚠️ No per-user quota enforcement
- ⚠️ Consider adding Cloud Functions for advanced rate limiting

### Future Enhancements
1. Implement per-user daily write quotas
2. Add IP-based rate limiting via Cloud Functions
3. Monitor and alert on suspicious patterns
4. Implement document size metering
5. Add audit logging for security events

## Compliance Notes

### GDPR
- ✅ Data isolation per user
- ✅ Users can delete their data
- ✅ No cross-user data sharing
- Consider adding data export functionality

### Data Retention
- Rules do not enforce retention policies
- Consider implementing TTL or archival strategy
- User data persists indefinitely unless deleted

## Contact

For security issues or questions:
- File a GitHub security advisory
- Email: [repository owner]

---

**Last Updated:** 2026-02-12  
**Rules Version:** 2  
**Compatible with:** Firebase SDK v9+
